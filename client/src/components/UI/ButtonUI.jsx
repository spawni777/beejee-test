import styles from '@/styles/ui/button-ui.module.scss';

const ButtonUI = ({
  children,
  onClick,
  type = 'button',
  style = {},
}) => {
  return (
    <button
      className={ styles.btn }
      onClick={ onClick }
      style={ style }
      type={ type }
    >
      { children }
    </button>
  )
}

export default ButtonUI;
