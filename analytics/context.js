const Analytics = require('./index');

module.exports = (context) => {
  const initialState = context.data();
  const analytics = new Analytics('blueberry-pancakes');
  analytics.onLoad(() => {
    analytics.updateState(initialState);
    context.onUpdate((newState) => {
      analytics.updateState(newState);
    });
  })
}
