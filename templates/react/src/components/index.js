<%_ if (project.features.admin) { _%>
import Options from './header-component/Options'
import Title from './header-component/Title'
import Copyright from './copyright'

export * from './wau'
export { Options, Title, Copyright }
<%_ } else { _%>
export {}
<%_ } _%>
