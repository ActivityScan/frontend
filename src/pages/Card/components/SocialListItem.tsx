import styles from './SocialListItem.module.scss'

interface SocialListItemProps {
  social: {
    type: string
  }
  club: {
    socials: {
      type: string
      url: string
    }[]
  }
}

const SocialListItem = ({ social, club }: SocialListItemProps) => {
  const url = club?.socials.find(
    (socialItem: { type: string }) =>
      socialItem.type.toLowerCase() === social.type,
  )?.url

  return (
    <li className={styles.card__list_item}>
      <img
        src={`/icons/${social.type.toLowerCase()}.svg`}
        alt={social.type}
        width={32}
        height={32}
        onClick={() => {
          if (url) {
            window.open(url, '_blank')
          }
        }}
      />
    </li>
  )
}

export default SocialListItem
