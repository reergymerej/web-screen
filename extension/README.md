# Extension (Chrome)

Are there strings you don't want to see?  I'll try and block them.


## Setup

Open the Chome console, put this in.
```js
const store = {
  LOCAL_STORAGE_KEY: 'web-screen',
  get(value) {
    const _store = JSON.parse(localStorage.getItem(this.LOCAL_STORAGE_KEY) || '{}')
    return value
      ? _store[value]
      : _store
  },
  set(name, value) {
    const _store = this.get()
    _store[name] = value
    localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify(_store))
  },
}
```

Then set a list of stuff you don't want like so.

```js
store.set('blacklist', [
  'poop',
  'pee',
  'politics',
  'religion',
  'cross fit'
])
```


## Install

Download this sucker.
open chrome://extensions
toggle on "Developer mode"
load unpacked
select this project

![install](./install.png)
