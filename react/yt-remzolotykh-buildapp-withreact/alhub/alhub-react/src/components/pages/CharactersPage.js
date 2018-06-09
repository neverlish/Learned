import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { charactersSelector } from '../../reducers/characters'

const CharactersPage = ({ characters }) => <div>
  {characters.length === 0 && (
    <div className='text-center'>
      <div className='alert alert-info'>
        You have no characters yet. Now about creating one?
      </div>
      <Link to='/characters/new' className='btn btn-primary btn-lg'>Create New Character</Link>
    </div>
  )}
</div>

CharacterData.propTypes = {
  characters: PropTypes.arrayOf(PropTypes.object).isRequired
}

function mapStateToProps(state) {
  return {
    characters: charactersSelector(state)
  }
}

export default connect(mapStateToProps)(CharactersPage)
