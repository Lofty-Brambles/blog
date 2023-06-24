---build

// Totum component
export interface Props {
  content: string;
  color: string;
}

const { content, color } = tm.props;

---client



---html

<p>{content}</p>

---sass

p
  color: var(--color)
