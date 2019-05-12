import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'user',
  // templateUrl: './user.component.html',
  // styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  users: any[];

  constructor(private service: UserService) {	}

    deleteDonut(user: any) {
      const vm = this;

      if (confirm("Are you sure you want to delete " + user.name + "?")) {
        vm.service.deleteUser(user)
        .subscribe(() => {
          // 1. we need to find the index of the item in the array
          let userIndex = vm.users.indexOf(user);
          // 2. now we can pass the index as argument into the splice method.
          vm.users.splice(userIndex, 1);
        }, err => {
          console.log(err);
          alert("Could not delete the user.");
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
