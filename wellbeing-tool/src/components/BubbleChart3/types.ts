/*
Author: Eli Elad Elrom
Website: https://EliElrom.com
License: MIT License
Component: src/component/BubbleChart/types.ts
*/

export namespace Types {
    export type Data = {
        id: number
        description: string
        icon: string
        size: number
        fillColor: string
    }

    export type ForceData = {
        size: number
    }
}