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
import { newKey, timestamp } from './src/Store/Database'
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
console.log(newKey('notes'))
console.log(newKey('notes'))
console.log(newKey('notes'))
console.log(newKey('notes'))
console.log(newKey('notes'))

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
  templateNewUser: {
    music: { log: 'rainSound' },
    pomodoro: {
      pomodoroDuration: 25,
      shortBreak: 5,
      longBreak: 15,
    },
    config: {
      background: 0,
      color: 'blue',
      taskbar: {
        blurting: true,
        feynman: true,
        flashcard: true,
        notes: false,
        todolist: false,
      },
      theme: 'light',
    },
    reports: {
      pomodoro: 0,
    },
    moduls: {
      '-Na81YO4mqL0MKbRjDNr': {
        title: 'Sejarah Majapahit 🏯🌊',
        date: `${timestamp().day}/${timestamp().month}/${timestamp().year}`,
        remembered: `
        🏹Majapahit adalah kerajaan maritim yang pernah berdiri di wilayah Nusantara pada masa lampau. Kerajaan ini merupakan salah satu kerajaan terbesar dan paling berpengaruh di Asia Tenggara pada abad ke-14 dan ke-15 Masehi.

        ⚔️Majapahit didirikan oleh Raden Wijaya, yang kemudian menjadi raja pertamanya dengan gelar Kertarajasa Jayawardhana. Kerajaan ini mencapai puncak kejayaannya di bawah pemerintahan Hayam Wuruk, yang memerintah dari tahun 1350 hingga 1389 Masehi.`,
        forgotten: `📌Beberapa hal terkait Sejarah Majapahit:

        Kebudayaan Majapahit: Majapahit dikenal karena kemajuan seni, sastra, dan arsitektur. Seni dan budaya Majapahit mencerminkan keberagaman wilayah Nusantara, dengan pengaruh Hindu-Buddha yang kuat.
        
        Perdagangan dan Ekspansi: Majapahit adalah kerajaan maritim yang berperan penting dalam perdagangan laut dan menjalin hubungan diplomatik dengan negara-negara tetangga seperti Tiongkok dan India.
        
        Kakawin Nagarakretagama: Ini adalah naskah sastra penting yang ditulis oleh Mpu Prapanca, seorang brahmana dan sarjana di istana Majapahit. Naskah ini berisi deskripsi tentang wilayah-wilayah yang dikuasai Majapahit dan merupakan sumber berharga tentang sejarah kerajaan tersebut.
        
        Runtuhnya Majapahit: Faktor-faktor seperti perebutan kekuasaan internal, bencana alam, dan invasi dari luar berkontribusi pada runtuhnya Majapahit pada abad ke-15 Masehi.`,
        questions: `
        1. Siapakah pendiri Majapahit?
        2. Siapa raja yang memerintah Majapahit pada masa kejayaannya?
        3. Apa yang membuat Majapahit menjadi kerajaan yang berpengaruh di Asia Tenggara?
        
        Jawaban✨
        
        1. Pendiri Majapahit adalah Raden Wijaya, yang kemudian menjadi raja pertamanya dengan gelar Kertarajasa Jayawardhana. Majapahit didirikan pada tahun 1293 Masehi.
        
        2. Raja yang memerintah Majapahit pada masa kejayaannya adalah Hayam Wuruk, yang memerintah dari tahun 1350 hingga 1389 Masehi.
        
        3. Majapahit menjadi kerajaan yang berpengaruh di Asia Tenggara karena:
        💠Kemajuan dalam perdagangan maritim: Majapahit merupakan kerajaan maritim yang menguasai jalur perdagangan laut dan menjalin hubungan dengan negara-negara lain di kawasan Asia Tenggara dan sekitarnya.
        💠Kebudayaan maju: Majapahit menjadi pusat kebudayaan dengan kemajuan seni, sastra, dan arsitektur yang mencerminkan keberagaman wilayah Nusantara.
        💠Kekuatan militer: Majapahit memiliki kekuatan militer yang kuat, sehingga mampu memperluas wilayah kekuasaannya dan mempertahankan stabilitas di wilayahnya.
        💠Naskah Kakawin Nagarakretagama: Naskah ini memberikan gambaran yang jelas tentang wilayah-wilayah yang dikuasai Majapahit dan menjadi sumber berharga tentang sejarah kerajaan tersebut.`,
      },
      '-Na81cssiDZFwItcWwzK': {
        title: 'Ekosistem dan Keanekaragaman Hayati 🍀',
        date: `${timestamp().day}/${timestamp().month}/${timestamp().year}`,
        remembered: `
        🌿Ekosistem adalah suatu lingkungan di mana organisme hidup berinteraksi satu sama lain dan dengan lingkungannya. Ekosistem mencakup semua bentuk kehidupan, termasuk tumbuhan, hewan, dan mikroorganisme, serta faktor abiotik seperti air, tanah, udara, dan cahaya matahari. Di dalam ekosistem, terdapat ketergantungan yang rumit antara makhluk hidup dan komponen lingkungan.

        🦎Keanekaragaman hayati merujuk pada variasi dan keragaman organisme hidup yang ada di bumi. Ini mencakup berbagai jenis spesies tumbuhan, hewan, jamur, dan mikroorganisme yang hidup dalam berbagai habitat dan ekosistem. Keanekaragaman hayati memiliki peran penting dalam menjaga keseimbangan ekosistem dan berkontribusi pada kesejahteraan manusia.`,
        forgotten: `
        📌Contoh konsep tentang Ekosistem dan Keanekaragaman Hayati:

        Macam-macam Ekosistem: Hutan hujan tropis, padang rumput, gurun pasir, dan terumbu karang adalah beberapa contoh ekosistem yang berbeda di dunia ini.
        
        Rantai Makanan: Rantai makanan menggambarkan bagaimana energi dan nutrisi ditransfer dari satu organisme ke organisme lain melalui makanan.
        
        Siklus Biogeokimia: Siklus biogeokimia melibatkan perpindahan unsur-unsur kimia penting seperti karbon, nitrogen, dan fosfor antara organisme dan lingkungan mereka.
        
        Spesies Endemik: Spesies endemik adalah organisme yang hanya ditemukan di wilayah tertentu dan tidak ada di tempat lain di dunia.`,
        questions: `
        1. Apa yang dimaksud dengan istilah "ekosistem"?
        2. Mengapa keanekaragaman hayati begitu penting untuk ekosistem dan manusia?
        3. Berikan contoh tentang rantai makanan dalam ekosistem hutan hujan tropis.
        
        Jawaban✨
        
        1. "Ekosistem" adalah suatu lingkungan di mana organisme hidup berinteraksi satu sama lain dan dengan lingkungannya. Ini mencakup komunitas organisme yang berbeda (tumbuhan, hewan, dan mikroorganisme) dan faktor abiotik (air, tanah, udara, dan cahaya matahari) yang saling mempengaruhi dalam suatu wilayah tertentu.
        
        2. Keanekaragaman hayati sangat penting untuk ekosistem dan manusia karena:
        💠Mempertahankan keseimbangan ekosistem: Keanekaragaman hayati membantu menjaga keseimbangan dalam rantai makanan dan hubungan antarorganisme, yang mempengaruhi kesehatan dan kelangsungan hidup ekosistem.
        💠Keanekaragaman sumber daya: Organisme yang berbeda memberikan beragam manfaat bagi manusia, seperti pangan, obat-obatan, bahan bangunan, dan lain-lain.
        💠Keberlanjutan alam: Keanekaragaman hayati memainkan peran penting dalam siklus biogeokimia dan menjaga stabilitas iklim dan lingkungan.
        💠Nilai estetika dan budaya: Keberagaman hayati memberikan keindahan alam dan keterkaitan budaya bagi masyarakat yang hidup di sekitar ekosistem tertentu.
        `,
      },
      '-Na81h-LcYqkuZZhRoXu': {
        title: 'Fisika Dasar 🚀',
        date: `${timestamp().day}/${timestamp().month}/${timestamp().year}`,
        remembered: `
        🌟Fisika adalah ilmu alam yang mempelajari tentang sifat-sifat materi, energi, ruang, waktu, dan interaksi di antara mereka. Fisika dasar adalah cabang fisika yang membahas konsep-konsep dasar yang menjadi dasar bagi bidang fisika lainnya.

        ⚙️Fisika dasar mencakup berbagai konsep penting, seperti hukum gerak Newton, hukum gravitasi, kinematika, dinamika, mekanika kuantum, relativitas, elektromagnetisme, dan termodinamika.`,
        forgotten: `
        📌Contoh konsep fisika dasar:

        Hukum Gerak Newton: Termasuk hukum kelembaman, percepatan, dan reaksi.
        
        Hukum Gravitasi: Menjelaskan gaya tarik-menarik antara dua benda karena massa mereka.
        
        Kinematika: Mempelajari gerak benda tanpa memperhatikan penyebabnya.
        
        Dinamika: Mempelajari hubungan antara gaya dan gerakan benda.
        
        Mekanika Kuantum: Teori yang menjelaskan perilaku partikel sub-atomik di skala sangat kecil.
        
        Relativitas: Teori tentang hubungan antara ruang, waktu, dan gravitasi pada kecepatan tinggi.
        
        Elektromagnetisme: Memahami interaksi antara muatan listrik dan medan magnet.
        
        Termodinamika: Mempelajari perubahan energi, panas, dan kerja dalam sistem fisik.`,
        questions: `
        1. Siapakah tokoh fisikawan terkenal yang merumuskan hukum gravitasi?
        2. Apa saja cabang-cabang fisika lainnya selain fisika dasar?
        3. Berikan contoh sederhana mengenai prinsip hukum kelembaman Newton.
        
        Jawaban✨
        
        1. Tokoh fisikawan terkenal yang merumuskan hukum gravitasi adalah Sir Isaac Newton.
        
        2. Cabang-cabang fisika lainnya selain fisika dasar antara lain:
        
        💠Fisika nuklir dan partikel: Mempelajari struktur inti atom dan partikel sub-atomik.
        💠Fisika optik: Memahami cahaya dan fenomena optik.
        💠Fisika fluida: Membahas perilaku fluida dalam berbagai kondisi.
        💠Fisika plasma: Memahami sifat plasma, yaitu gas yang terionisasi.
        💠Fisika medis: Menerapkan konsep fisika dalam bidang kedokteran dan pengobatan.
        💠Fisika material: Memahami sifat dan karakteristik material.
        
        3. Contoh sederhana mengenai prinsip hukum kelembaman Newton adalah jika sebuah bola diam, maka akan tetap diam kecuali ada gaya eksternal yang bekerja padanya. Begitu pula, jika bola bergerak dengan kecepatan konstan, maka akan terus bergerak dengan kecepatan yang sama kecuali ada gaya yang memperlambat atau mengubah arah geraknya.`,
      },
    },
    notes: {
      '-Na81qrvCH9nxvYV7rLQ': {
        title: 'Segitiga 🧮 ',
        text: `
        Rumus luas segitiga 📝
        Luas = 1/2 x alas x tinggi
        
        Dalam rumus tersebut, "alas" adalah panjang salah satu sisi segitiga yang berfungsi sebagai dasar segitiga, sedangkan "tinggi" adalah garis tegak lurus dari alas ke titik puncak segitiga.
        
        Contoh soal 📚
        Sebuah segitiga memiliki panjang alas sebesar 8 cm dan tinggi sebesar 6 cm. Hitunglah luas segitiga tersebut!
        
        Langkah-langkah Penyelesaian:
        1. Gunakan rumus luas segitiga: Luas = 1/2 x alas x tinggi
        2. Masukkan nilai alas = 8 cm dan tinggi = 6 cm ke dalam rumus.
           Luas = 1/2 x 8 cm x 6 cm
        3. Hitung hasilnya:
           Luas = 4 cm x 6 cm
           Luas = 24 cm^2
        
        Jadi, luas segitiga tersebut adalah 24 cm^2. ✨`,
      },
      '-Na81szXvCMxcP6njcUF': {
        title: 'Pemrograman Bahasa C🍀',
        text: `
        🌱Pemrograman bahasa C adalah salah satu jenis pemrograman komputer yang menggunakan bahasa pemrograman C. Bahasa C dikembangkan oleh Dennis Ritchie pada tahun 1972 dan menjadi salah satu bahasa pemrograman yang paling populer dan banyak digunakan hingga saat ini.

        ⚙️Bahasa C merupakan bahasa pemrograman tingkat tinggi yang memiliki sintaksis sederhana dan efisien. Bahasa ini biasanya digunakan untuk mengembangkan perangkat lunak sistem, seperti sistem operasi, kompilator, dan perangkat lunak embedded.
        
        📌Kelebihan dari bahasa C antara lain:
        1. Efisiensi: Bahasa C dapat menghasilkan kode program yang efisien dalam hal penggunaan memori dan kecepatan eksekusi.
        2. Portabilitas: Kode program dalam bahasa C dapat dijalankan di berbagai platform atau sistem operasi dengan sedikit atau tanpa modifikasi.
        3. Fleksibilitas: Bahasa C memberikan kontrol langsung terhadap hardware komputer, sehingga cocok untuk pengembangan perangkat keras (hardware) atau aplikasi yang membutuhkan performa tinggi.
        4. Populeritas: Bahasa C telah digunakan secara luas selama bertahun-tahun, sehingga memiliki banyak dokumentasi, sumber daya belajar, dan dukungan komunitas yang besar.
        
        Namun, karena sintaksisnya yang lebih kompleks dibandingkan dengan beberapa bahasa pemrograman modern lainnya, belajar pemrograman bahasa C mungkin memerlukan waktu dan usaha lebih bagi pemula.`,
      },
    },
    tasks: [
      {
        task: `✨Mengerjakan tugas seni budaya`,
        checked: false,
        date: '2023-07-14T22:16',
      },
      {
        task: `🌱Mengumpul kerajinan berbasis kayu jati`,
        checked: false,
        date: '2023-07-29T09:00',
      },
      {
        task: `🍀Kerja kelompok praktikum fisika`,
        checked: false,
        date: '2023-07-02T10:00',
      },
      {
        task: `📜Membuat tugas makalah Bahasa Indonesia`,
        checked: false,
        date: '2023-07-07T08:00',
      },
    ],
  },
}
