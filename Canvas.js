class Canvas extends fabric.Canvas {
  constructor(...args) {
  super(...args);
  fabric.VerticalTextbox = VerticalTextbox;
  this.isEditing = false;
  }

  onStartEditing() { }
  onStopEditing() { }

  startEditing() {
  this.isEditing = true;
  this.onStartEditing();
  }

  stopEditing() {
  this.isEditing = false;
  this.onStopEditing();
  this._historySaveAction();
  }

  initialize(...args) {
  super.initialize.apply(this, args);
  this._historyInit();
  return this;
  }

  dispose(...args) {
  super.dispose.apply(this, args);
  this._historyDispose();
  return this;
  }

  _historyNext() {
  return JSON.stringify(this.toDatalessJSON(this.extraProps));
  }

  _historyEvents() {
  return {
    'object:added': this._historySaveAction.bind(this),
    'object:removed': this._historySaveAction.bind(this),
    'object:modified': this._historySaveAction.bind(this),
    'object:skewing': this._historySaveAction.bind(this)
  };
  }

  _historyInit() {
  this.historyUndo = [];
  this.historyRedo = [];
  this.extraProps = ['selectable'];
  this.historyNextState = this._historyNext();
  this.on(this._historyEvents());
  }

  _historyDispose() {
  this.off(this._historyEvents());
  }

  _historySaveAction() {
  if (this.historyProcessing || this.isEditing) return;
  const json = this.historyNextState;
  this.historyUndo.push(json);
  this.historyNextState = this._historyNext();
  this.fire('history:append', { json: json });
  }

  undo(callback) {
  this.historyProcessing = true;
  const history = this.historyUndo.pop();
  if (history) {
    this.historyRedo.push(this._historyNext());
    this.historyNextState = history;
    this._loadHistory(history, 'history:undo', callback);
  } else {
    this.historyProcessing = false;
  }
  }

  redo(callback) {
  this.historyProcessing = true;
  const history = this.historyRedo.pop();
  if (history) {
    this.historyUndo.push(this._historyNext());
    this.historyNextState = history;
    this._loadHistory(history, 'history:redo', callback);
  } else {
    this.historyProcessing = false;
  }
  }

  _loadHistory(history, event, callback) {
  var that = this;
  this.loadFromJSON(history, function () {
    that.renderAll();
    that.fire(event);
    that.historyProcessing = false;
    if (callback && typeof callback === 'function') callback();
  });
  }

  clearHistory() {
  this.historyUndo = [];
  this.historyRedo = [];
  this.fire('history:clear');
  }

  offHistory() {
  this.historyProcessing = true;
  }

  onHistory() {
  this.historyProcessing = false;
  this._historySaveAction();
  }
}