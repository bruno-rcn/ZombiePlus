const {expect} = require('@playwright/test')

export class Toast{

    constructor(page){
        this.page = page
    }

    async haveText(msg){
        await expect(this.page.locator('.toast')).toContainText(msg)
    
        await expect(this.page.locator('.toast')).not.toBeVisible({timeout: 5000})
    }
}


export class Popup{

    constructor(page){
        this.page = page
    }

    async haveText(msg){
        await expect(this.page.locator('.swal2-html-container')).toContainText(msg)
    }
}