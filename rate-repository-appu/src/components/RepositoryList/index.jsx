import { Text, FlatList, Pressable, View } from 'react-native'
import { useNavigate } from 'react-router-native'
import RepositoryItem from './RepositoryItem.jsx'
import { Picker } from '@react-native-picker/picker'
import { useRepositories } from '../../hooks/useRepositories.js'
import React, { useState } from 'react'
import { useDebounce } from 'use-debounce'
import StyledTextInput from '../StyledTextInput.jsx'

export class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    return (
      <>
        <StyledTextInput
          value={this.props.filter}
          onChangeText={(value) => this.props.setFilter(value)}
          placeholder='Search'
          placeholderTextColor='#666'
        />
        <Picker
          selectedValue={this.props.order}
          onValueChange={(itemValue, itemIndex) => {
            this.props.setOrder(itemValue)
          }}
        >
          <Picker.Item label='Latest repositories' value='Latest' />
          <Picker.Item label='Highest rated repositories' value='Highest rated' />
          <Picker.Item label='Lowest rated repositories' value='Lowest rated' />
        </Picker>
      </>
    )
  }

  render () {
    return (
      <FlatList
        data={this.props.repositories}
        ItemSeparatorComponent={() => (<Text> </Text>)}
        ListHeaderComponent={this.renderHeader}
        onEndReached={this.props.onEndReach}
        onEndReachedThreshold={0.5}
        renderItem={({ item: repo }) => {
          return (
            <View style={{ margin: 5, marginBottom: 10 }}>
              <Pressable onPress={() => this.props.handlePress(repo.id)}>
                <RepositoryItem repo={repo} key={repo.id}/>
              </Pressable>
            </View>
          )
        }}
        style={{ flex: 1 }}
      />
    )
  }
}

const RepositoryList = () => {
  const [order, setOrder] = useState('Latest')
  const [filter, setFilter] = useState('')
  const [debouncedFilter] = useDebounce(filter, 500)
  const { repositories, fetchMore } = useRepositories(order, debouncedFilter, 8)
  const navigate = useNavigate()

  const onEndReach = () => {
    fetchMore()
  }

  const handlePress = repoId => {
    navigate(`/${repoId}`, { replace: true })
  }

  return (
    <RepositoryListContainer repositories={repositories} onEndReach={onEndReach} handlePress={handlePress} filter={filter} setFilter={setFilter} order={order} setOrder={setOrder}/>
  )
}

export default RepositoryList
