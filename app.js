App = Ember.Application.create();

App.Router.map(function() {
  this.resource('people',{path:'/people'});
  this.resource('person',{path:'/people/:person_id'});
});

App.IndexRoute = Ember.Route.extend({
  model: function() {
    return ['red', 'yellow', 'blue'];
  }
});

App.PeopleRoute = Ember.Route.extend({
  model: function() {
    return this.store.find('person');
  }
});

App.PersonRoute = Ember.Route.extend({
    model: function(params) {
        return this.store.find('person',params.person_id);
    }
})

App.ApplicationAdapter = DS.RESTAdapter.extend({
//    namespace: 'anahita-workspace/anahitatest/www',
    // host: 'http://www.getanahita.com',
    headers: {
        'accept':'application/json'
    }
});

App.ArrayTransform = DS.Transform.extend({
   deserialize:function(value) {
       return value;
   } 
});

App.PersonSerializer = DS.RESTSerializer.extend({
    extractArray: function(store, type, payload) { 
        var people = payload.data;
        payload = {'people': people};
        return this._super(store,type,payload);
    },
    extractSingle: function(store, type, payload) {
        payload = {'person': payload };
        return this._super(store,type,payload);
    }
});

App.PersonModel = DS.Model.extend({
  'objectType': DS.attr('string'),
  'name': DS.attr('string'),
  'body': DS.attr('string'),
  'alias': DS.attr('string'),
  'imageURL': DS.attr('array'),
  'isLeader': DS.attr('boolean'),
  'isFollower': DS.attr('boolean'),
  'followerCount': DS.attr('number'),
  'leaderCount': DS.attr('number'),
  'mutualCount': DS.attr('number'),
  'subscriberCount': DS.attr('number'),
  'username': DS.attr('string')
});