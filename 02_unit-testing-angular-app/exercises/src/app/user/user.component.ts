import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'user',
  templateUrl: './user.component.html',
  // styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  users: any[];
  activeUser: any;

  constructor(private userService: UserService) {	}

    // deleteDonut(user: any) {
    //
    //   if (confirm('Are you sure you want to delete ' + user.name + '?')) {
    //     this.userService.deleteUser(user)
    //     .subscribe(() => {
    //       // 1. we need to find the index of the item in the array
    //       let userIndex = this.users.indexOf(user);
    //       // 2. now we can pass the index as argument into the splice method.
    //       this.users.splice(userIndex, 1);
    //     }, err => {
    //       console.log(err);
    //       alert('Could not delete the user.');
    //     });
    //   }
    // }

    ngOnInit() {
      this.userService.getAll()
      .subscribe((response: any[]) => {
        this.users = response;
      })

      this.userService.getUser('110866')
      .subscribe((response: any) => {
        this.activeUser = response;
      })


      /*

      on deleteUser :
         set actuveuser to undefined


      on deleteUser with id '123'

*/
    }
}
