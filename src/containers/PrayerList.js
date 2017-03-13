import React, { Component } from 'react';
import { connect } from 'react-redux'
import { View, Image, StyleSheet, ScrollView, ListView } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
let styles
import axios from 'axios';
import { PRAYER_LIST_PENDING, PRAYER_LIST_URL } from '../constants';
import { prayerListPending, prayerListSuccess, prayerListError } from '../actions'

import {
  Button,
  List,
  ListItem,
  Text,
  SearchBar
} from 'react-native-elements'

function mapStateToProps (state) {
  return {
    prayerList: state.app.prayerList
    //prayerList: state.app.get('prayerList').toJS()
  }
}

function mapDispatchToProps (dispatch) {
  return {
    onPrayerListPending: () => dispatch(prayerListPending()),
    onPrayerListSuccess: (data) => dispatch(prayerListSuccess(data)),
    onPrayerListError: () => dispatch(prayerListError()),
  }
}

const log = () => console.log('this is an example method')

class PrayerList extends Component {
	static navigationOptions = {
		title: 'Prayer List',
  }

  constructor () {
    super()

    this.renderRow = this.renderRow.bind(this)
  }

  componentWillMount () {
		const { onPrayerListSuccess, onPrayerListError } = this.props;

    this.dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    console.log('in cdm', PRAYER_LIST_URL);
    this.props.onPrayerListPending();

    /*axios.get(PRAYER_LIST_URL)
      .then(resp => { console.log('resp.data', resp.data); return resp.data })
      .then(data => { console.log('data', data); return data })
      .then(data => onPrayerListSuccess(data))
      .catch(err => {
             console.log('ERROR12334q23423423452345: ', err); // log since could be render err
             onPrayerListError(err);
      })*/
  }

  renderRow (rowData, sectionID) {
    return (
      <ListItem
        key={sectionID}
        onPress={log}
        title={rowData.title}
        icon={{name: rowData.icon}}
      />
    )
  }

  render () {
		const {navigate} = this.props.navigation;

    return (
			<View>
      <ScrollView keyboardShouldPersistTaps="always" style={styles.mainContainer}>
        <List>
          <ListView
            renderRow={this.renderRow}
            dataSource={this.dataSource.cloneWithRows(this.props.prayerList)}
            />
        </List>
      </ScrollView>
			<Button
				onPress={() => navigate('CreatePrayer', { })}
				title="Add Prayer"
			/>
			</View>
    )
  }
}

styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#ebedf1'
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(PrayerList)
