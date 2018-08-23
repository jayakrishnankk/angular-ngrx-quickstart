import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Widget, WidgetsService, WidgetState } from '@workspace/common-data';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-widgets',
  templateUrl: './widgets.component.html',
  styleUrls: ['./widgets.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WidgetsComponent implements OnInit {
  widgets$: Observable<Widget[]>;
  currentWidget: Widget;

  constructor(
    private widgetsService: WidgetsService,
    private store: Store<WidgetState>
  ) {
    this.widgets$ = store.pipe(
      select('widgets'),
      map((state: WidgetState) => state.widgets)
    );
  }

  ngOnInit() {
    this.getWidgets();
    this.resetCurrentWidget();
  }

  resetCurrentWidget() {
    this.currentWidget = { id: null, name: '', price: 0, description: '' };
  }

  selectWidget(widget) {
    this.currentWidget = widget;
  }

  reset(widget) {
    this.resetCurrentWidget();
  }

  getWidgets() {
    this.widgets$ = this.widgetsService.all();
  }

  saveWidget(widget) {
    if (!widget.id) {
      this.createWidget(widget);
    } else {
      this.updateWidget(widget);
    }
  }

  createWidget(widget) {
    this.widgetsService.create(widget)
      .subscribe(response => {
        this.getWidgets();
        this.resetCurrentWidget();
      });
  }

  updateWidget(widget) {
    this.widgetsService.update(widget)
      .subscribe(response => {
        this.getWidgets();
        this.resetCurrentWidget();
      });
  }

  deleteWidget(widget) {
    this.widgetsService.delete(widget)
      .subscribe(response => {
        this.getWidgets();
        this.resetCurrentWidget();
      });
  }
}
