Router.configure({
  layoutTemplate: 'base',
  loadingTemplate: 'loading'
});

Router.map(function() {
  this.route('tweet_stream', {
    path: '/',
    waitOn: function() {
      return Meteor.subscribe('tweets');
    },
    data: function() {
      return {
        tweets: Tweets.find()
      }
    }
  });
  this.route('notifications', {path: '/notifications'});
  this.route('profile', {
    path: '/:username',
    waitOn: function() {
      return [
        Meteor.subscribe('profile', this.params.username),
        Meteor.subscribe('profileTweets', this.params.username)
      ]
    },
    data: function() {
      return {
        user: Meteor.users.findOne({username: this.params.username})
      }
    }
  });
});