

const tippyLoad = () => {
  // tippy that only needs to load on page load

  tippy('#sort-btn', {
    content: 'Sort by',
  });

  tippy('#clear-btn', {
    content: 'Clear all completed tasks',
  });

}

const tippyCards = () => {

  tippy('.editBtn', {
    content: 'Edit',
  })

  tippy('.deleteBtn', {
    content: 'Delete',
    theme: 'custom'
  })

}

module.exports = { tippyLoad, tippyCards }