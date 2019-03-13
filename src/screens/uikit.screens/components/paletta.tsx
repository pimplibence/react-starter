import * as React from 'react';
import './paletta.scss';

const palettas = [
    {
        namespace: 'brand-color',
        categories: [
            {
                category: 'primary',
                variants: [1, 2, 3, 4, 5, 6, 7]
            },
            {
                category: 'secondary',
                variants: [1, 2, 3, 4, 5, 6, 7]
            },
            {
                category: 'accent',
                variants: [1, 2, 3, 4, 5, 6, 7]
            }
        ]
    },
    {
        namespace: 'builtin-color',
        categories: [
            {
                category: 'blue',
                variants: [1, 2, 3]
            },
            {
                category: 'yellow',
                variants: [1, 2, 3]
            },
            {
                category: 'red',
                variants: [1, 2, 3]
            },
            {
                category: 'green',
                variants: [1, 2, 3]
            },
            {
                category: 'neutral',
                variants: [1, 2, 3, 4, 5, 6, 7]
            }
        ]
    }
];

export class Paletta extends React.Component<any, any> {

    public render(): React.ReactNode {
        return <div>

            {palettas.map((palette, index: number) => <div className="row mb-2" key={index}>

                <div className="col-24 mb-2">
                    <h3>{palette.namespace}</h3>
                </div>

                {palette.categories.map((category, categoryIndex: number) => <div className="col-24 col-md-12 col-lg-8" key={categoryIndex}>

                    <div className="row">

                        <div className="col-24 mb-2">
                            <span>{category.category}</span>
                        </div>

                        <div className="col-24 mb-2">
                            <div className="row">

                                <div className="col-24">
                                    {category.variants.map((variant: number, variantIndex: number) => {
                                        return this.renderSquare(variantIndex, variant, '', false);
                                    })}
                                </div>

                                <div className="col-24">
                                    {category.variants.map((variant: number, variantIndex: number) => {
                                        return this.renderSquare(variantIndex, variant, `border-radius-1 ${palette.namespace}--bgc-${category.category}-${variant}`);
                                    })}
                                </div>

                                <div className="col-24">
                                    {category.variants.map((variant: number, variantIndex: number) => {
                                        return this.renderSquare(variantIndex, variant, `border-2 border-radius-1 ${palette.namespace}--bc-${category.category}-${variant}`);
                                    })}
                                </div>

                                <div className="col-24">
                                    {category.variants.map((variant: number, variantIndex: number) => {
                                        return this.renderSquare(variantIndex, variant, `border-1 border-radius-1 ${palette.namespace}--bc-${category.category}-${variant}`);
                                    })}
                                </div>
                            </div>
                        </div>

                    </div>

                </div>)}

            </div>)}

        </div>;
    }

    private renderSquare(index: number, variant: number, classes: string, ignoreText = true) {
        return <div className="square" key={index}>
            <div className={classes}>
                {!ignoreText && <span>{variant}</span>}
            </div>
        </div>;
    }

}
