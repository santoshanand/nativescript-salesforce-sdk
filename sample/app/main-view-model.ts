import {Observable} from 'data/observable';
import {ObservableArray} from 'data/observable-array';
export class HelloWorldModel extends Observable {

    private _counter: number;
    private _message: string;
    private _items:ObservableArray<object>;
    constructor() {
        super();

        // Initialize default values.
        this._counter = 42;
        this.updateMessage();

        
    }

    get items() {
      return this._items;
    }

    set items(value:ObservableArray<object>) {
      this._items = value;
      this.notifyPropertyChange('items', value);
    }

    get message(): string {
        return this._message;
    }
    
    set message(value: string) {
        if (this._message !== value) {
            this._message = value;
            this.notifyPropertyChange('message', value)
        }
    }

    public onTap() {
        this._counter--;
        this.updateMessage();
    }

    private updateMessage() {
        if (this._counter <= 0) {
            this.message = 'Hoorraaay! You unlocked the NativeScript clicker achievement!';
        } else {
            this.message = `${this._counter} taps left`;
        }
    }
}