;(() => {
  console.log('Web Screen is running.')

  // umm... This sucks.  This has to be done on each domain.
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

  let blacklistedStrings = store.get('blacklist')
  if (!blacklistedStrings) {
    console.log('Update your blacklist if you want this to do anything.  See the readme.')
    return
  }
  console.log('Hiding: ', blacklistedStrings)

  const hasSubstring = (substring) => (value = '') => value.includes(substring)
  const substringCheckers = blacklistedStrings.map(hasSubstring)
  console.log(substringCheckers)

  const hasBlacklistedSubstring = (value) => {
    const hasSome = substringCheckers.some(checker => {
      return checker(value)
    })
    if (hasSome) {
      // console.log('blacklisting', value)
    }
    return hasSome
  }

  const shouldHideImage = (img) => {
    return hasBlacklistedSubstring(img.src)
  }

  const hideImage = (x) => {
    x.src = ''
  }

  document.querySelectorAll('img').forEach(x => {
    if (shouldHideImage(x)) {
      hideImage(x)
    }
  })

  const getParentWithText = (nodes, text, ancestor) => {
    let found = false
    let nextAncestor = ancestor
    nodes.forEach(node => {
      if (!found) {
        const hasText = node.textContent.includes(text)
        if (hasText) {
          found = true
          const closerNode = getParentWithText(node.childNodes, text, node)
          if (closerNode) {
          }
        }
      }
    })
    return nextAncestor
  }

  const hasTextToFilter = hasBlacklistedSubstring(document.body.textContent)
  if (hasTextToFilter) {
    console.log({hasTextToFilter})
    // TODO: Update to find all blacklisted nodes in a tree.  This is junk.
    const parentNode = getParentWithText(document.querySelectorAll('div'), 'BLACKLISTED WORD HERE', document)
    if (parentNode) {
      parentNode.textContent = parentNode.textContent.replace(/\w/g, '*')
    }
  }
})()
