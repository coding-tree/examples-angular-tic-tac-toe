import { Component, OnInit, OnDestroy, Input, ElementRef } from '@angular/core';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit, OnDestroy {
  @Input() id: string;
  private element: any;

  constructor(
    private modalService: ModalService,
    private el: ElementRef
    ) {
    this.element = el.nativeElement;
  }

  ngOnInit() {
    this.initializeModal();
  }

  initializeModal() {
    const modal = this;

    if (!this.id) {
      console.error('Modal must have an id');
      return;
    }

    document.body.appendChild(this.element);

    this.element.addEventListener('click', (e: any) => {
      if (e.target.className === 'modal') {
        modal.close();
      }
    });

    this.modalService.add(this);
  }

  open(): void {
    this.element.style.display = 'block';
    document.body.classList.add('modal-open');
  }

  close(): void {
    this.element.style.display = 'none';
    document.body.classList.remove('modal-open');
  }

  ngOnDestroy(): void {
    this.modalService.remove(this.id);
    this.element.remove();
  }
}
