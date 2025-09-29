import './Container.css'

export default function Container({
  children,
  className = '',
  as: Tag = 'section',
  baseClassName = 'container',
  id,
}) {
  return (
    <Tag className={`${baseClassName} ${className}`} id={id}>
      {children}
    </Tag>
  )
}