// sampleData.js

const clients = [
    {
      id: '1',
      name: 'Tony Stark',
      email: 'ironman@gmail.com',
      phone: '343-567-4333',
    },
    {
      id: '2',
      name: 'Natasha Romanova',
      email: 'blackwidow@gmail.com',
      phone: '223-567-3322',
    },
    {
      id: '3',
      name: 'Thor Odinson',
      email: 'thor@gmail.com',
      phone: '324-331-4333',
    },
    {
      id: '4',
      name: 'Bruce Banner',
      email: 'hulk@gmail.com',
      phone: '312-444-2211',
    },
    {
      id: '5',
      name: 'Steve Rogers',
      email: 'cap@gmail.com',
      phone: '301-555-7788',
    }
  ];
  
  const projects = [
    {
      id: '1',
      clientId: '1',
      name: 'eCommerce Website',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor.',
      status: 'In Progress',
    },
    {
      id: '2',
      clientId: '2',
      name: 'Mobile Game App',
      description:
        'Ut hendrerit libero nec libero tincidunt, vitae bibendum justo gravida.',
      status: 'Completed',
    },
    {
      id: '3',
      clientId: '3',
      name: 'Portfolio Website',
      description:
        'Curabitur nec lorem ut sapien porttitor faucibus a sed justo.',
      status: 'Not Started',
    },
    {
      id: '4',
      clientId: '4',
      name: 'Machine Learning Dashboard',
      description:
        'Integer vel sapien in nisl tristique volutpat. Donec euismod porta orci.',
      status: 'In Progress',
    },
    {
      id: '5',
      clientId: '5',
      name: 'Social Media Platform',
      description:
        'Mauris tincidunt, leo vel commodo cursus, ligula sapien bibendum justo, ut tincidunt nunc.',
      status: 'Completed',
    }
  ];
  
  module.exports = { clients, projects };
  