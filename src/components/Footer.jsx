import Icon from './Icon'
import '../styles/Footer.css'

//Path icons
import todolistIcon from '../assets/icon/todolist.png'
import blurtingIcon from '../assets/icon/blurting.png'
import flashcardIcon from '../assets/icon/flashcard.png'
import feynmanIcon from '../assets/icon/feynman.png'
import homeIcon from '../assets/icon/home.png'
import searchIcon from '../assets/icon/search.png'
import musicIcon from '../assets/icon/music.png'

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="icon-container">
        <div className="left">
          <Icon path={homeIcon} />
        </div>
        <div className="center">
          <Icon path={todolistIcon} />
          <Icon path={blurtingIcon} />
          <Icon path={flashcardIcon} />
          <Icon path={feynmanIcon} />
          <Icon path={musicIcon} />
        </div>
        <div className="right">
          <Icon path={searchIcon} />
          <div className="pomodoro">25:00</div>
        </div>
      </div>
    </div>
  )
}

export default Footer
