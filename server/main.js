import { WebApp } from 'meteor/webapp';
import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo';
import { Projects } from '../imports/api/projects.js';
import { Logs } from '../imports/api/logs.js';

Meteor.startup(() => {
    if (Projects.find().count() === 0) {
      var projects = [
        {
          name: 'Google',
          link: 'google.com',
          children: [
            {
              name: 'Google Drive',
              link: 'drive.google.com',
              children:[
                {
                  name: 'Google Drive',
                  link: 'docs.google.com',
                },
                {
                  name: 'Google Forms',
                  link: 'forms.google.com',
                }
              ]
            },
            {
              name: 'Gmail',
              link: 'gmail.com',
            }
          ]
        },
        {
          name: 'Yandex',
          link: 'yandex.ru',
          children: [
            {
              name: 'Yandex Disk',
              link: 'disk.yandex.com',
            },
            {
              name: 'Yandex Mail',
              link: 'mail.yandex.com'
            },
            {
              name: 'Yandex Money',
              link: 'money.yandex.ru'
            }
          ]
        }

      ]

      projects.forEach(function(project, index){
      project.order = [];
      project.removed = false;
      project.author = 'server';
      project.parent = null;
      project.date = new Date();
      project.sublinks = [];
      project.order.push(index+1);
//      project.hierarchy = (index+1) * 100000;
      Projects.insert(project,
        function (error, project_id){
          console.log("Project added", project.name);
          if (!error) {
            if (project.children !== undefined && project.children.length > 0) {
              for (var j = 0; j < project.children.length; j++) {
                let child = project.children[j];
                child.parent = project_id;
                child.order = [];
                child.removed = false;
                child.author = 'server';
                child.date = new Date();
                child.sublinks = [];
      //          child.hierarchy = (j+1) * 1000 + project.hierarchy;
                child.order.push(index+1);
                child.order.push(j+1);
                Projects.insert(child, function(error,child_id){

                  Projects.update(project_id, {
                    $push: {
                        sublinks: {id: child_id}
                    }
                  })


                  console.log("Child added", child_id, project_id);
                  if (!error) {
                    if (child.children !== undefined && child.children.length > 0) {
                      //console.log("Child added", child);
                        for (var k = 0; k < child.children.length; k++) {
                          let subchild = child.children[k];
                            subchild.parent = child_id;
                            subchild.order = [];
                            subchild.removed = false;
                            subchild.author = 'server';
                            subchild.date = new Date();
                            subchild.sublinks = [];
                  //          subchild.hierarchy = (k+1) * 10 + child.hierarchy;
                            subchild.order.push(index+1);
                            subchild.order.push(j+1);
                            subchild.order.push(k+1);
                            Projects.insert(subchild, function(error,subchild_id){
                              Projects.update(child_id, {
                                $push: {
                                    sublinks: {id: subchild_id}
                                }
                              })
                            console.log("Subchild added", subchild_id, child_id);
                        })
                      }
                    }

                  }
                });
              }//end for
            } //end if
          }//end error
            else{console.log(error);}
          } // end function callback
      )//end insert
    });

    }
});
