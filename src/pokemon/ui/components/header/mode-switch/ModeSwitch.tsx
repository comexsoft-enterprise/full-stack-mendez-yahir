import { useState } from 'react';
import styles from './ModeSwitch.module.css';

interface Props {
  isActive?: boolean;
  onToggle: (newState: boolean) => void;
  className:string
}

export const ModeSwitch = ({ isActive = false, onToggle, className }: Props) => {
  const [enabled, setEnabled] = useState(isActive);

  const toggle = () => {
    const newState = !enabled;
    setEnabled(newState);
    onToggle(newState);
  };

  return (
    <div className={`${styles.container} ${className}`} onClick={toggle}>
      {/* LADO IZQUIERDO */}
      <div className={`${styles.part} ${enabled ? styles.activeLeft : styles.inactiveLeft}`}>
        {enabled ? 'ON' : 'MODO LIBRE'}
      </div>

      {/* LADO DERECHO */}
      <div className={`${styles.part} ${enabled ? styles.activeRight : styles.inactiveRight}`}>
        {enabled ? 'MODO LIBRE' : 'OFF'}
      </div>
    </div>
  );
};