class GlobalState {
  private _data: Record<string, any>
  set(key: string, value: any) {
    this._data[key] = value
  }

  get(key: string) {
    return this._data[key] || undefined
  }

  remove(key: string) {
    delete this._data[key]
  }
}

export const globalState = new GlobalState()
