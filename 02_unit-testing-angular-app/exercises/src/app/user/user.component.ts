import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  users: any[];

  constructor(private service: UserService) {	}

  deleteUser(user: any) {
    if (confirm("Are you sure you want to delete " + user.name + "?")) {
      var index = this.users.indexOf(user)
      this.users.splice(index, 1);

      this.service.deleteUser(user.id).subscribe(
        null,
        err => {
          alert("Could not delete the user.");
          this.users.splice(index, 0, user);
        });
      }
    }

    ngOnInit() {
      this.service.getAll()
      .subscribe((response: any) => {
        this.users = response;
      })
    }
}
