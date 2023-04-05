import React from 'react'
import { shallow } from 'enzyme'
import { RecoilRoot } from 'recoil'
import BubbleChart from './BubbleChart'

describe('<BubbleChart />', () => {
    let component

    beforeEach(() => {
        component = shallow(
            <RecoilRoot>
                <BubbleChart bubblesData={[]} width={800} height={600} textFillColor="drakgrey" backgroundColor="#ffffff" minValue={1} maxValue={150} selectedCircle={Function} />
            </RecoilRoot>
        )
    })

    test('It should mount', () => {
        expect(component.length).toBe(1)
    })
})