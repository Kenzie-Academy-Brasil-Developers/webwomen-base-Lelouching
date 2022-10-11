/* Desenvolva sua lógica aqui... */

function jobsRender(array){

    let ul = document.querySelector(".jobs-list")

    array.forEach(element => {
        let li = document.createElement("li")
        let spanRoleInfo = document.createElement("span")
        let divNameState = document.createElement("div")
        let spanNameCompany = document.createElement("span")
        let spanState = document.createElement("span")
        let spanRoleDescription = document.createElement("span")
        let divRowColumn = document.createElement("div")
        let divWorkingType = document.createElement("div")
        let buttonApply = document.createElement("button")

        li.classList.add("job-apply", "flex", "flex-column")
        spanRoleInfo.classList.add("span-role-info")
        divNameState.classList.add("div-name-state", "flex")
        spanNameCompany.classList.add("span-name-company")
        spanState.classList.add("span-state")
        spanRoleDescription.classList.add("span-role-description")
        divRowColumn.classList.add("div-row-column", "flex")
        divWorkingType.classList.add("div-working-type", "flex")
        buttonApply.classList.add("button-apply")

        spanRoleInfo.innerText = element.title
        spanNameCompany.innerText = element.enterprise
        spanState.innerText = element.location
        spanRoleDescription.innerText = element.descrition
        element.modalities.forEach(element => {
            let spanWorkingType = document.createElement("span")
            spanWorkingType.classList.add("span-working-type")
            spanWorkingType.innerText = element
            divWorkingType.appendChild(spanWorkingType)
        });
        buttonApply.innerText = "Candidatar"
        buttonApply.id = element.id

        ul.appendChild(li)
        li.append(spanRoleInfo, divNameState, spanRoleDescription, divRowColumn)
        divRowColumn.append(divWorkingType, buttonApply)
        divNameState.append(spanNameCompany, spanState)
    });
}

jobsRender(jobsData)

let appliedCandidacy = []

function candidacy() {

    let buttons = [...document.querySelectorAll(".button-apply")]

    buttons.forEach(element => {
        element.addEventListener("click", (event) => {
            if(event.target.innerText == "Remover candidatura") {
                event.target.innerText = "Candidatar"
                appliedCandidacy.forEach(element2 => {
                    if(element2.id == event.target.id) {
                        const indexOf = appliedCandidacy.indexOf(element2)
                        appliedCandidacy.splice(indexOf, 1)
                        renderjobsChosen()
                    }
                });
            } else {
                event.target.innerText = "Remover candidatura"
                jobsData.forEach(element3 => {
                    if(element3.id == event.target.id) {
                        appliedCandidacy.push(element3)
                        renderjobsChosen()
                    }
                });
            }
        })
    });
}

candidacy()

function renderjobsChosen() {

    let section = document.querySelector(".section-select")

    section.innerHTML = ""

    let h2JobsChosen = document.createElement("h2")
    h2JobsChosen.innerText = "Vagas selecionadas"
    h2JobsChosen.classList.add("h2-jobs-chosen")

    if(appliedCandidacy.length > 0) {
        let ul = document.createElement("ul")

        ul.innerHTML = ""

        ul.classList.add("jobs-chosen-lists", "flex", "flex-column")
        section.classList.remove("section-jobs-chosen")
        h2JobsChosen.classList.add("h2-jobs-chosen-2")

        section.appendChild(ul)
        ul.appendChild(h2JobsChosen)

        appliedCandidacy.forEach(element => {
            let li = document.createElement("li")
            let divRoleButton = document.createElement("div")
            let spanRoleInfo = document.createElement("span")
            let buttonDelete = document.createElement("button")
            let imageTrash = document.createElement("img")
            let divNameState = document.createElement("div")
            let spanNameCompany = document.createElement("span")
            let spanState = document.createElement("span")

            li.classList.add("jobs-chosen-list", "flex", "flex-column")
            divRoleButton.classList.add("flex", "justify-between")
            buttonDelete.classList.add("button-delete")
            imageTrash.classList.add("image-trash")
            spanRoleInfo.classList.add("span-role-info-2")
            divNameState.classList.add("div-name-state", "flex")
            spanNameCompany.classList.add("span-name-company")
            spanState.classList.add("span-state")

            buttonDelete.id = element.id
            imageTrash.src = "../../assets/img/lixeira.png"
            imageTrash.alt = "Lixeira"
            imageTrash.id = element.id
            spanRoleInfo.innerText = element.title
            spanNameCompany.innerText = element.enterprise
            spanState.innerText = element.location

            ul.append(li)
            li.append(divRoleButton,divNameState)
            divRoleButton.append(spanRoleInfo, buttonDelete)
            buttonDelete.appendChild(imageTrash)
            divNameState.append(spanNameCompany, spanState)

            buttonDelete.addEventListener("click", (event) => {
                if(element.id == event.target.id) {
                    const indexOf = appliedCandidacy.indexOf(element)
                    appliedCandidacy.splice(indexOf, 1)

                    let buttonsApply = [...document.querySelectorAll(".button-apply")]
                    buttonsApply.forEach(element2 => {
                        if(element2.id == element.id) {
                            element2.innerText = "Candidatar"
                        }
                    });

                    renderjobsChosen()
                }
            })
        });
    } else{
        section.classList.add("section-jobs-chosen")
        h2JobsChosen.classList.remove("h2-jobs-chosen-2")

        let divSpansAside = document.createElement("div")
        let spanJobsNotChosen = document.createElement("span")
        let span1 = document.createElement("span")
        let span2 = document.createElement("span")
        let divSpansAside2 = document.createElement("div")
        let span3 = document.createElement("span")
        let span4 = document.createElement("span")
        let span5 = document.createElement("span")

        divSpansAside.classList.add("div-spans-aside", "flex", "flex-column")
        spanJobsNotChosen.classList.add("span-jobs-not-chosen")
        span1.classList.add("span-not-write", "span-not-write-1")
        span2.classList.add("span-not-write", "span-not-write-2")
        divSpansAside2.classList.add("div-spans-aside-2", "flex", "flex-column")
        span3.classList.add("span-not-write", "span-not-write-3")
        span4.classList.add("span-not-write", "span-not-write-4")
        span5.classList.add("span-not-write", "span-not-write-5")

        spanJobsNotChosen.innerText = "Você ainda não aplicou para nenhuma vaga"

        section.append(h2JobsChosen, divSpansAside)
        divSpansAside.append(spanJobsNotChosen, span1, span2, divSpansAside2)
        divSpansAside2.append(span3, span4, span5)
    }

    saveData()
}

function saveData() {
    
    let candidacyString = JSON.stringify(appliedCandidacy)
    
    let saving = localStorage.setItem("candidacy-data", candidacyString)
}

function loadingData() {

    let loading = localStorage.getItem("candidacy-data")
    
    let loaded = JSON.parse(loading)

    if(loaded.length > 0) {
        appliedCandidacy = loaded
        renderjobsChosen()
        let buttonsApply = [...document.querySelectorAll(".button-apply")]
        appliedCandidacy.forEach(element => {
            const find = buttonsApply.find((data) => data.id == element.id)
            find.innerText = "Remover candidatura"
        });
    }
}

loadingData()