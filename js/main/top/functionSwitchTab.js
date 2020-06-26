function updateTab(){
  let tabs = ["tab1", "tab2","tab3"]
  for(let i=0;i<tabs.length;i++){
    document.getElementById(tabs[i]).style.display = "none"
  }
    document.getElementById(selectedTab.tab).style.display = "block"
}
function switchTab(tab){
    selectedTab.tab = tab
    updateTab()
}
