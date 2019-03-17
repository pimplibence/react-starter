import * as React from 'react';
import { Buttons } from './components/buttons/buttons';
import { Grid } from './components/grid/grid';
import { Inputs } from './components/inputs/inputs';
import { Palette } from './components/palette/palette';
import { Typography } from './components/typography/typography';

export class UikitScreen extends React.Component<any, any> {

    public render(): React.ReactNode {
        return <div className="container-fluid no-gutters">
            <div className="container mt-2 mb-5">
                <h1>Grid</h1>
                <Grid className="p-4 palette--bc-neutral-3 elevation-1 border-1 border-radius-2"/>
            </div>
            <div className="container mt-2 mb-5">
                <h1>Inputs</h1>
                <Inputs className="p-4 palette--bc-neutral-3 elevation-1 border-1 border-radius-2"/>
            </div>
            <div className="container mt-2 mb-5">
                <h1>Buttons</h1>
                <Buttons className="p-4 palette--bc-neutral-3 elevation-1 border-1 border-radius-2"/>
            </div>
            <div className="container mt-2 mb-5">
                <h1>Colors & Borders</h1>
                <Palette className="p-4 palette--bc-neutral-3 elevation-1 border-1 border-radius-2"/>
            </div>
            <div className="container mt-2 mb-5">
                <h1>Typography</h1>
                <Typography className="p-4 palette--bc-neutral-3 elevation-1 border-1 border-radius-2"/>
            </div>
        </div>;
    }

}
