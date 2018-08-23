import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Widget, WidgetState } from '@workspace/common-data';
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

  constructor(private store: Store<WidgetState>) {
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
    this.store.dispatch({type: 'widgets'});
  }

  saveWidget(widget) {
    if (!widget.id) {
      this.createWidget(widget);
    } else {
      this.updateWidget(widget);
    }
  }

  createWidget(widget) {
    this.store.dispatch({type: 'create', payload: widget});
  }

  updateWidget(widget) {
    this.store.dispatch({type: 'update', payload: widget});
  }

  deleteWidget(widget) {
    this.store.dispatch({type: 'delete', payload: widget.id});
  }
}
