export default function Toggle({ on, onChange }) {
  return (
    <button
      onClick={() => onChange(!on)}
      className={`toggle ${on ? 'on' : 'off'}`}
    />
  )
}
