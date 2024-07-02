self.addEventListener('push', () => {
  self.registration.showNotification('My God, it is working! Sorry, do you want notifications?')
})