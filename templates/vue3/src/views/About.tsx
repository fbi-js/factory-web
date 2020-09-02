import { defineComponent } from 'vue'
import HelloWorld from '/@/components/HelloWorld'

export default defineComponent({
  name: 'App',
  setup() {
    return () => (
      <>
        <h1>About</h1>
        <HelloWorld />
      </>
    )
  },
})
