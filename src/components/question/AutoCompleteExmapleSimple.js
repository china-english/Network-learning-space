import React from 'react';
import AutoComplete from 'material-ui/AutoComplete';

export default class AutoCompleteExampleSimple extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      dataSource: [],
    };
  }

  handleUpdateInput = (value) => {
    console.log(value);
    this.setState({
      dataSource: [
        value,
        value + value,
        value + value + value,
      ],
    });
  };
  onNewRequest=(chosenRequest,index)=>{
    alert(chosenRequest);
  };

  render() {
    const fruit = [
      'Apple', 'Apricot', 'Avocado',
      'Banana', 'Bilberry', 'Blackberry', 'Blackcurrant', 'Blueberry',
      'Boysenberry', 'Blood Orange',
      'Cantaloupe', 'Currant', 'Cherry', 'Cherimoya', 'Cloudberry',
      'Coconut', 'Cranberry', 'Clementine',
      'Damson', 'Date', 'Dragonfruit', 'Durian',
      'Elderberry',
      'Feijoa', 'Fig',
      'Goji berry', 'Gooseberry', 'Grape', 'Grapefruit', 'Guava',
      'Honeydew', 'Huckleberry',
      'Jabouticaba', 'Jackfruit', 'Jambul', 'Jujube', 'Juniper berry',
      'Kiwi fruit', 'Kumquat',
      'Lemon', 'Lime', 'Loquat', 'Lychee',
      'Nectarine',
      'Mango', 'Marion berry', 'Melon', 'Miracle fruit', 'Mulberry', 'Mandarine',
      'Olive', 'Orange',
      'Papaya', 'Passionfruit', 'Peach', 'Pear', 'Persimmon', 'Physalis', 'Plum', 'Pineapple',
      'Pumpkin', 'Pomegranate', 'Pomelo', 'Purple Mangosteen',
      'Quince',
      'Raspberry', 'Raisin', 'Rambutan', 'Redcurrant',
      'Salal berry', 'Satsuma', 'Star fruit', 'Strawberry', 'Squash', 'Salmonberry',
      'Tamarillo', 'Tamarind', 'Tomato', 'Tangerine',
      'Ugli fruit',
      'Watermelon',
    ];
    const dataSource3 = [
      {textKey: 'Some Text', valueKey: 'someFirstValue'},
      {textKey: 'Some Text', valueKey: 'someSecondValue'},
    ];
    const dataSourceConfig = {
      text: 'textKey',
      value: 'valueKey',
    };
    return (
      <div>
        <AutoComplete
          hintText="Type anything"
          dataSource={dataSource3}
          filter={AutoComplete.noFilter}
          onUpdateInput={this.handleUpdateInput}
          onNewRequest={this.onNewRequest}
          dataSourceConfig={dataSourceConfig}
        />
        <AutoComplete
          hintText="Type anything"
          filter={AutoComplete.noFilter}
          dataSource={dataSource3}
          onNewRequest={this.onNewRequest}
          onUpdateInput={this.handleUpdateInput}
          floatingLabelText="Full width"
          fullWidth={true}
          dataSourceConfig={dataSourceConfig}
        />
      </div>
    );
  }
}
