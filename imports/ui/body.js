import { Mongo } from 'meteor/mongo';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Session } from 'meteor/session'
import { Projects } from '../api/projects.js';
import { Logs } from '../api/logs.js';
import './body.html';
var prototypeData = {};


 Template.addDialog.onCreated(function () {
   this.showModal = new ReactiveVar(false);
 });
 Template.editDialog.onCreated(function () {
   Session.set("showEditModal", false);
   this.showEditModal = Session.get("showEditModal");
 });

Template.prototypesList.helpers({
   projects: ()=> {
     return Projects.find({});
   }
});
Template.addDialog.helpers({
      showModal: ()=> {
        return   Template.instance().showModal.get();
      }
});
Template.editDialog.helpers({
      showEditModal: ()=> {
        return Session.get("showEditModal");
      },
      prototypeInfo: ()=>{
          return Projects.findOne({_id: prototypeData});
      }
});
Template.prototypesList.events({
    'click span.favorite-add'(event, template) {
        Projects.update(this._id, {
            $set: {
                isFavorite: true
            }
        });
    },
    'click span.favorite-remove'(event, template) {
        Projects.update(this._id, {
            $set: {
                isFavorite: false
            }
        });
    },
    'click button.remove'(event, template) {
    Projects.update(this._id, {
      $set: {
        removed: true
      }
    });
  },
    'click button.restore'(event, template) {
    const newName = event.target.name.value;
    const newLink = event.target.link.value;
    const author = Meteor.userId();
    const newDate = new Date();
    Projects.update(this._id, {
      $set: {
        removed: false
      }
    });

    Logs.insert({
      name: newName,
      link: newLink,
      parent: parent,
      author: author,
      date: newDate,
      type: "removed"
    });
  },
    'click button.edit'(event, template) {
    prototypeData = this._id;
    Session.set("showEditModal", true);
  }
})
Template.editDialog.events({
  'click button.closeEdit'(event, template) {
    Session.set("showEditModal", false);
  },
  'submit .updatePrototype'(event, template) {
    event.preventDefault();
    const newName = event.target.name.value;
    const newLink = event.target.link.value;
    const author = Meteor.userId();
    const newDate = new Date();
    Projects.update(prototypeData,
      {
        $set: {
          name: newName,
          link: newLink,
          category: "None",
          author: author,
          date: newDate,
        }
      }
    );
    Logs.insert({
      name: newName,
      link: newLink,
      parent: parent,
      author: author,
      date: newDate,
      type: "update"
    });

    Session.set("showEditModal", false);
  },
});
Template.addDialog.events({
  'click button.add'(event, template) {
    template.showModal.set( true );
  },
  'click button.close'(event, template) {
    template.showModal.set( false );
  },
  'submit .addPrototype'(event, template) {
    event.preventDefault();
    const newName = event.target.name.value;
    const parent = event.target.name.parent;
    const newLink = event.target.link.value;
    const author = Meteor.userId();
    const newDate = new Date();
    Projects.insert({
      name: newName,
      link: newLink,
      parent: parent,
      author: author,
      date: newDate,
      sublinks: []
    });
    Logs.insert({
      name: newName,
      link: newLink,
      parent: parent,
      author: author,
      date: newDate,
      type: "added"
    });
    event.target.name.value = '';
    event.target.link.value = '';
    template.showModal.set( false );
  },
});
