import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ApiService } from '../services/api.service';
import { UserStateService } from '../services/user-state.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit {
  @Input() pageSizeOptions: number[] = [10, 20, 30, 50, 100];
  @Input() currentPage: number = 1;
  @Input() totalItems: number = 0;
  @Input() pageSize: number = 10;

  @Output() pageChange = new EventEmitter<number>();
  @Output() pageSizeChange = new EventEmitter<number>();
  user: any;

  constructor(public userStateService: UserStateService) {
    this.userStateService.getUser().subscribe((user) => {
      this.user = user;
      this.calculateTotalPages();
    });
  }

  ngOnInit(): void {}

  onPageChange(newPage: number): void {
    this.currentPage = newPage;
    this.pageChange.emit(newPage);
  }

  onPageSizeChange(newPageSizeEvent: Event): void {
    const newPageSize: number = Number(
      (newPageSizeEvent.target as HTMLInputElement).value
    );
    this.pageSizeChange.emit(newPageSize);
  }

  calculateTotalPages(): number {
    if (this.user && this.user.public_repos) {
      return Math.ceil(this.user.public_repos / this.pageSize);
    } else {
      return 0;
    }
  }

  getPageNumbers(): number[] {
    const totalPages = this.calculateTotalPages();
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }
}
