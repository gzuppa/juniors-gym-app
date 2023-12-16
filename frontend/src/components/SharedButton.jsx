const SharedButton = props => {
  return (
    <div class="relative inline-flex  group">
      <div class="absolute transitiona-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-[#9318c4] via-[#FF44EC] to-[#FF675E] rounded-xl blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt"></div>
      <a
        href={props.href}
        title={props.title}
        class="relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-yellow-300 transition-all duration-200 bg-gray-900 font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-00"
        role="button"
      >
        {props.text}
      </a>
    </div>
  )
}

export default SharedButton
