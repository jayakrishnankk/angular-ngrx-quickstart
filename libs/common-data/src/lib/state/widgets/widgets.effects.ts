import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/nx';
import { map } from 'rxjs/operators';
import { LoadWidgets, WidgetsActionTypes, WidgetsLoaded } from './widgets.actions';
import { Widget } from '../../core/widgets/widget.model';
import { WidgetsService } from '../../core/widgets/widgets.service';
import { WidgetState } from './widgets.reducer';

@Injectable({providedIn: 'root'})
export class WidgetsEffects {

  @Effect()
  loadWidgets$ = this.dataPersistence.fetch(WidgetsActionTypes.LoadWidgets, {
      run: (action: LoadWidgets, state: WidgetState) => {
        return this.widgetsService.all()
          .pipe(
            map((res: Widget[]) => new WidgetsLoaded(res))
          )
      },
      onError: () => {}
    }
  );
  constructor(
    private actions$: Actions,
    private dataPersistence: DataPersistence<WidgetState>,
    private widgetsService: WidgetsService
  ) {}
}
