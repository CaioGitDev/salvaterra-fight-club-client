import styles from './navbar.module.css'
import { MdSearch } from 'react-icons/md'
import Image from 'next/image'

import userImage from '../../../../public/images/caio.svg'

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        {/* pesquisa */}
        <div className={styles.search}>
          <input
            className={styles.search_input}
            type="search"
            placeholder="Pesquisar atleta..."
            name="search"
          ></input>
          <div className={styles.search_icon}>
            <MdSearch size={20} />
          </div>
        </div>
        {/* user */}
        <div className={styles.user}>
          <div className={styles.user_data}>
            <Image
              className={styles.user_data_avatar}
              src={userImage}
              alt="user avatar"
              width={42}
              height={42}
            />
            <div className={styles.user_data_name}>Caio Rosa</div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
