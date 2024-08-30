import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserServiceService } from 'src/app/shared/services/UserService/user-service.service';

@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.css']
})
export class FormUserComponent implements OnInit{

  userForm: FormGroup;
  id: number = 0;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserServiceService
  ) { 
    this.userForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.pattern(/^[a-zA-Z\s]*$/)]],
      telephone: ['', [Validators.required, Validators.pattern(/^[0-9]*$/)]],
      email: ['', [Validators.required, Validators.email]],
      image: ['', null],
    });
  }
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.userService.getUser(this.id).subscribe(
      (response)=>{
        this.userForm.get('name')?.setValue(response.data.name);
        this.userForm.get('telephone')?.setValue(response.data.telephone);
        this.userForm.get('email')?.setValue(response.data.email);
      }
    )
  }


  updateUser(): void {
    if (this.userForm.valid) {
      this.userService.updateUser(this.id, this.userForm.value).subscribe(
        (response) => {
          this.router.navigate(['/client/profile']);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  onFileChange(event: any): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.userForm.patchValue({
        image: file
      });
    }
  }
}
