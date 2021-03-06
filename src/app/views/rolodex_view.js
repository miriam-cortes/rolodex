import Backbone from 'backbone';
import _ from 'underscore';
import $ from 'jquery';

import ContactView from 'app/views/contact_view'

const RolodexView = Backbone.View.extend({
  initialize: function(options) {
    this.contactsData = options.contactsData; //stores the full list of contacts
    this.contactTemplate = _.template($('#tmpl-contact-card').html()); //compiles a template to be shared between the contacts
    this.listElement = this.$('#contact-cards'); //keep track of the <li> elements

    this.cardList = [];
    this.contactsData.forEach(function(contact) {
      var card = new ContactView({
        contact: contact,
        template: this.contactTemplate
      });
      this.cardList.push(card);
    }, this);

    this.input = {
      name: this.$('.contact-form input[name="name"]'),
      email: this.$('.contact-form input[name="email"]'),
      phone: this.$('.contact-form input[name="phone"]')
    };
  }, //close initialize

  render: function() {
    this.listElement.empty(); //make sure the DOM is empty before we start adding to it
    this.cardList.forEach(function(card) {
      card.render(); //cause the contact to render
      this.listElement.append(card.$el); //add the html to the rolodex
    }, this);
    return this;
  }, //close render

  events: {
    'click .btn-save': 'createContact',
    'click .btn-cancel': 'clearInput'
  }, //close events

  clearInput: function(event) {
    event.preventDefault();
    console.log('clear input button pressed');
    this.input.name.val('');
    this.input.email.val('');
    this.input.phone.val('');
  }, //close clearInput

  createContact: function(event) {
    event.preventDefault();
    console.log('creating a contact button pressed!');
    var contact = this.getInput();
    this.contactsData.push(contact);
    var card = new ContactView({
      contact: contact,
      template: this.contactTemplate
    });
    this.cardList.push(card);
    this.render();
    this.clearInput(); //this is causing an error in my console log but it's still working...:shrugs:
  }, //close createContact

  getInput: function() {
    var contact = {
      name: this.input.name.val(),
      email: this.input.email.val(),
      phone: this.input.phone.val()
    };
    return contact;
  }//close getInput
});

export default RolodexView;
