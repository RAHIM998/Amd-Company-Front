import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommandeDetails } from 'src/app/shared/models/Commandes/commande-details';
import { DashboardServiceService } from 'src/app/shared/services/DashboardService/dashboard-service.service';
import { Chart, registerables } from 'chart.js';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

  NbCommandeEnCours: number = 0;
  NbCommandePaid: number = 0;
  NbCommandeAnnule: number = 0;
  CAjournalier: number = 0;
  CommandeEnCours: CommandeDetails[] = [];
  CommandePaid: CommandeDetails[] = [];
  CommandeAnnule: CommandeDetails[] = [];
  selectedOrders: CommandeDetails[] = [];
  public chart: any;

  constructor(
    private router: Router,
    private dashboardService: DashboardServiceService
  ){
    Chart.register(...registerables); 
  }

  ngOnInit(): void {
    this.loadData(); 
    this.loadMonthlySales();
  }


  loadData() {
    this.dashboardService.getCommandeValide().subscribe(
      (response) => {
        this.NbCommandePaid = response.data.nbCommandeValide;
        this.CAjournalier = Number(response.data.MontantTotal) || 0;
        this.CommandePaid = response.data.commandes;
      },
      (error) => {
        console.log(error);
      }
    );

    this.dashboardService.getCommandeEnCours().subscribe(
      (response) => {
        this.NbCommandeEnCours = response.data.total;
        this.CommandeEnCours = response.data.orders;
      },
      (error) => {
        console.log(error);
      }
    );

    this.dashboardService.getCommandeAnnulee().subscribe(
      (response) => {
        this.NbCommandeAnnule = response.data.NbCommandeAnnulee;
        this.CommandeAnnule = response.data.Commande;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  

  loadMonthlySales() {
    this.dashboardService.VentesMensuelles().subscribe(
      (response) => {
        if (response.success) {
          // Initialisez salesData avec 0 pour chaque mois
          const salesData: number[] = Array(12).fill(0);
          const months: string[] = [
            'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
            'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
          ];
  
          // Mettre à jour les données des ventes pour chaque mois disponible
          response.data.forEach((item) => {
            const month = item.month  ?? 0;
            const totalSales = item.total_sales || 0; 
  
            if (month >= 1 && month <= 12) {
              salesData[month - 1] = totalSales; 
            }
          });
  
          this.createChart(months, salesData);
        } else {
          console.log(response.message);
        }
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

createChart(months: string[], salesData: number[]) {
  this.chart = new Chart("MyChart", {
    type: 'bar',
    data: {
      labels: months,
      datasets: [{
        label: "Ventes Mensuelles",
        data: salesData,
        backgroundColor: 'white',
        barThickness: 30,
      }]
    },
    options: {
      aspectRatio: 2.5,
      scales: {
        x: {
          beginAtZero: true,
        },
        y: {
          beginAtZero: true,
          ticks: {
            callback: function(value: number | string) {
              return value + ' FCFA';
            }
          }
        }
      }
    }
  });
}

  showOrders(type: string) {
    switch(type) {
      case 'enCours':
        this.selectedOrders = this.CommandeEnCours;
        break;
      case 'paid':
        this.selectedOrders = this.CommandePaid;
        break;
      case 'cancelled':
        this.selectedOrders = this.CommandeAnnule;
        break;
      case 'caJournalier':
        this.selectedOrders = [];
        break;
    }
  }


}
