import { utils } from 'fbi'
export function getNameAndDescriptionConfig(defaultName: string) {
  return [
    {
      type: 'input',
      name: 'name',
      message: 'Input the project name',
      initial({ enquirer }: any) {
        return defaultName
      },
      validate(value: any) {
        const name = utils.formatName(value)
        return (name && true) || 'please input a valid project name'
      }
    },
    {
      type: 'input',
      name: 'description',
      message: 'Input project description',
      initial({ state }: any) {
        return `${state.answers.name} description`
      }
    }
  ]
}
