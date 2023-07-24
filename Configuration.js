import {
  FaClipboardList,
  FaChalkboardTeacher,
  FaRegStickyNote,
} from 'react-icons/fa'
import { BsFire, BsCardHeading, BsSearch } from 'react-icons/bs'

import img1 from './src/Assets/Wallpaper/img1.jpg'
import img2 from './src/Assets/Wallpaper/img2.jpg'
import img3 from './src/Assets/Wallpaper/img3.jpg'
import img4 from './src/Assets/Wallpaper/img4.jpg'
import img5 from './src/Assets/Wallpaper/img5.jpg'
import img6 from './src/Assets/Wallpaper/img6.jpg'
import img7 from './src/Assets/Wallpaper/img7.jpg'
import img8 from './src/Assets/Wallpaper/img8.jpg'
import img9 from './src/Assets/Wallpaper/img9.jpg'
import img10 from './src/Assets/Wallpaper/img10.jpg'
import img11 from './src/Assets/Wallpaper/img11.jpg'
import img12 from './src/Assets/Wallpaper/img12.jpg'
const video1 = 'https://youtu.be/kUSYA2z6Low'
const video2 = 'https://youtu.be/h-IFxZglesE'

export const Wallpaper = [
  { src: img1, id: 'img' },
  { src: img2, id: 'img' },
  { src: img3, id: 'img' },
  { src: img4, id: 'img' },
  { src: img5, id: 'img' },
  { src: img6, id: 'img' },
  { src: img7, id: 'img' },
  { src: img8, id: 'img' },
  { src: img9, id: 'img' },
  { src: img10, id: 'img' },
  { src: img11, id: 'img' },
  { src: img12, id: 'img' },
  { src: video1, id: 'video' },
  { src: video2, id: 'video' },
]

export const Configuration = {
  linkTutorialMBD: 'https://youtu.be/CoKPPo4HWK4',
  linkGithub: 'https://github.com/bmsptra24/Meja-Belajar-Digital',
  linkYoutube: 'https://youtu.be/siHQue6a6nI',
  linkEmail: 'mailto:sbima2432@gmail.com',
  apps: [
    { title: 'Todolist', icon: FaClipboardList },
    { title: 'Note', icon: FaRegStickyNote },
    { title: 'Blurting', icon: BsFire },
    { title: 'Flashcard', icon: BsCardHeading },
    { title: 'Feynman', icon: FaChalkboardTeacher },
    { title: 'Search', icon: BsSearch },
  ],
}
