/* eslint-disable */

const fields = [
  {
    label: 'Name',
    name: 'name',
    type: 'Alphanumeric',
    placeholder: 'Name',
    validation: {
      required: true,
      minLength: 2,
      minLength: 8,
    }
  },
  {
    label: 'Nickname',
    name: 'nickname',
    type: 'Alphanumeric',
    placeholder: 'Nickname',
    validation: {
      required: true,
      minLength: 2,
      maxLength: 8,
    },
  },
  {
    label: 'Age',
    name: 'age',
    type: 'Numeric',
    validation: {
      required: true,
      minValue: 0,
      maxValue: 200,
    },
  },
  {
    label: 'Which are your favourite package managers? (checkbox list)',
    name: 'favourite_package_manager',
    type: 'CheckboxGroup',
    options: ['yarn', 'npm', 'pip', 'gem', 'pear'],
    validation: {
      minSelected: 1,
    },
  },
  {
    label: 'Pick something from the network? (with selector)',
    name: 'network_picker',
    type: 'CheckboxGroup',
    optionsSelector: (state) => (
      state.network.nodes.map((node) => (node.name))
    ),
    validation: {
    },
  },
  {
    label: 'Which package managers have you used? (no validations)',
    name: 'used_package_managers',
    type: 'CheckboxGroup',
    options: ['yarn', 'npm', 'pip', 'gem', 'pear'],
    validation: {

    },
  },
  {
    label: 'Pick one. (radio group)',
    name: 'pick_opne',
    type: 'RadioGroup',
    options: ['yarn', 'npm', 'pip', 'gem', 'pear'],
    validation: {
    },
  },
  {
    label: 'Which package managers have you contributed to? (toggle group)',
    name: 'contributed_package_managers',
    type: 'ToggleGroup',
    options: ['yarn', 'npm', 'pip', 'gem', 'pear'],
    colors: ['red', 'green', 'blue', 'yellow', 'pink'],
    validation: {
    },
  },
];

export default {
  config: {
    "name": "My first interview protocol",
    "version": "1.2.3",
    "required": "1.2.4",
    "exportPath": "some/path/here.json",
    "stages": [
      {
<<<<<<< HEAD
        "id": "namegen1",
        "type": "NameGenerator",
        "icon": "menu-name-generator",
        "title": "Closeness",
=======
        "id": "quiz1",
        "type": "Quiz",
        "title": "Quiz",
>>>>>>> Replacing text input.
        "params": {
          "prompts": [
            {
<<<<<<< HEAD
              id: '6cl',
              title: 'Within the past 6 months, who have you felt particularly close to, or discussed important personal matters with?',
              nodeAttributes: {
                special_category: 46,
                close_friend: true,
              },
            },
            {
              id: '6su',
              title: "Within the past 6 months, who has been supportive?",
              nodeAttributes: {
                support_friend: true,
              },
            },
            {
              id: '2we',
              title: "Within the past 2 weeks, who has visited",
              nodeAttributes: {
                travel_friend: true,
              },
=======
              id: '6qz',
              title: 'Huge quize',
              nodeAttributes: {},
>>>>>>> Replacing text input.
            },
          ],
          form: {
            title: 'Answer some questions',
            name: 'quiz1',
            fields: fields,
            autoPopulate: (fields, values, populate) => {
              if(!fields['nickname'] || !fields['nickname'].touched) {
                populate('nickname', values['name'].split(' ')[0]);
              }
            },
          },
        },
      },
    ],
  },
};

// export default {
//   config: {
//     "name": "My first interview protocol",
//     "version": "1.2.3",
//     "required": "1.2.4",
//     "exportPath": "some/path/here.json",
//     "data": {
//       "previous": {
//         nodes: [
//           {
//             uid: "previous_1",
//             type: "person",
//             name: "Fred",
//             nickname: "Foo",
//           },
//           {
//             uid: "previous_2",
//             type: "person",
//             name: "Bob",
//             nickname: "Bar",
//           },
//           {
//             uid: "previous_3",
//             type: "person",
//             name: "Barry",
//             nickname: "Baz",
//           },
//         ],
//       },
//       "foodNetwork": {
//         nodes: [
//           {
//             type: "food",
//             subType: "vegetable",
//             name: "tomato",
//           },
//           {
//             type: "food",
//             subType: "fruit",
//             name: "lime",
//           },
//           {
//             type: "food",
//             subType: "fruit",
//             name: "bluefruit",
//           },
//         ],
//       },
//     },
//     "stages": [
//       {
//         "id": "namegen1",
//         "type": "NameGenerator",
//         "icon": "menu-name-generator",
//         "title": "Name Generator Title 1",
//         "params": {
//           "nodeType": 'person',
//           "panels": [
//             'existing',
//             'previous',
//           ],
//           "prompts": [
//             {
//               id: '6cl',
//               title: 'Within the past 6 months, who have you felt close to?',
//               nodeAttributes: {
//                 special_category: 46,
//                 close_friend: true,
//               },
//             },
//             {
//               id: '6su',
//               title: "Within the past 6 months, who has been supportive?",
//               nodeAttributes: {
//                 support_friend: true,
//               },
//             },
//             {
//               id: '2we',
//               title: "Within the past 2 weeks, who has visited",
//               nodeAttributes: {
//                 travel_friend: true,
//               },
//             },
//           ],
//           form: {
//             title: 'Answer some questions',
//             name: 'quiz1',
//             fields: fields,
//             autoPopulate: (fields, values, populate) => {
//               if(!fields['nickname'] || !fields['nickname'].touched) {
//                 populate('nickname', values['name'].split(' ')[0]);
//               }
//             },
//           },
//         },
//       },
//       {
//         "id": "namegen2",
//         "type": "NameGenerator",
//         "icon": "menu-name-generator",
//         "title": "Name Generator Title 2",
//         "params": {
//           "nodeType": 'person',
//           "prompts": [
//             {
//               id: '5be',
//               title: "Within the past 6 months, what's the best person you've seen ever?",
//               nodeAttributes: {
//                 fun_times: true,
//               },
//             },
//           ],
//           form: {
//             title: 'Answer some questions',
//             name: 'quiz2',
//             fields: fields,
//             autoPopulate: (fields, values, populate) => {
//               if(!fields['nickname'] || !fields['nickname'].touched) {
//                 populate('nickname', values['name'].split(' ')[0]);
//               }
//             },
//           },
//           "panels": [
//             'existing',
//           ],
//         },
//       },
//     ],
//   },
// };
