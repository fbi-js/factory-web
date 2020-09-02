import { defineComponent, ref } from 'vue'
import logo from '../assets/logo.png'
export default defineComponent({
  name: 'HelloWorld',
  props: {
    msg: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const count = ref(0)
    return () => (
      <>
        <img src={logo} alt="" />
        <h1>{props.msg}</h1>
        <button
          onClick={() => {
            count.value++
          }}
        >
          count is: {count.value}
        </button>
        <p>
          Edit <code>components/HelloWorld.tsx</code> to test hot module
          replacement.
        </p>
      </>
    )
  },
})
