import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../shared/auth.service';

// User interface
export class User {
  name: String;
  email: String;
}

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})

export class UserProfileComponent implements OnInit {
  UserProfile: User;
  UserList: any;
  constructor(
    public authService: AuthService
  ) {
    this.authService.profileUser().subscribe((data: any) => {
      this.UserProfile = data;
    })
  }

  ngOnInit() {
    this.getUser();
  }
  getUser() {
    this.authService.userlist().subscribe((data: any) => {
      this.UserList = data;
      console.log(this.UserList);
    })
  }

  delete(id) {
    this.authService.userDelete(id).subscribe((data: any) => {
      console.log(data);
      this.getUser();
    })
  }

  update(id, name) {
    var txt;
    var newName = prompt("Please enter new name:", name);
    if (newName == null || newName == "") {
      console.log("User cancelled the prompt.");
      
    } else {
      this.authService.updatename(id,newName).subscribe((res)=> {
        console.log(res);
        this.getUser();
      });
      
    }
    console.log("new name is ::",newName);
    console.log("new name id is ::",id);
    
  }

}
