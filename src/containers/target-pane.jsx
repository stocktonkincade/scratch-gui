const bindAll = require('lodash.bindall');
const React = require('react');

const {connect} = require('react-redux');

const {
    openBackdropLibrary,
    openSpriteLibrary,
    closeBackdropLibrary,
    closeCostumeLibrary,
    closeSoundLibrary,
    closeSpriteLibrary
} = require('../reducers/modals');

const {
    setSpriteToolbox,
    setStageToolbox,
    setSpeechToolbox,
    setWedoToolbox
} = require('../reducers/toolbox');

const TargetPaneComponent = require('../components/target-pane/target-pane.jsx');

class TargetPane extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleChangeSpriteDirection',
            'handleChangeSpriteName',
            'handleChangeSpriteRotationStyle',
            'handleChangeSpriteVisibility',
            'handleChangeSpriteX',
            'handleChangeSpriteY',
            'handleDeleteSprite',
            'handleSelectSprite',
            'handleSpeechClick',
            'handleWedoClick'
        ]);
    }
    componentDidUpdate (prevProps) {
        if (this.props.editingTarget !== prevProps.editingTarget) {
            const id = this.props.editingTarget;
            if (this.props.sprites[id]) {
                switch (this.props.sprites[id].name) {
                case 'Speech':
                    this.props.onSetSpeechToolbox();
                    this.selectExtensionsCategory();
                    break;
                case 'LEGO WeDo':
                    this.props.onSetWedoToolbox();
                    this.selectExtensionsCategory();
                    break;
                default:
                    this.props.onSetSpriteToolbox();
                }
            } else if (id === this.props.stage.id) {
                this.props.onSetStageToolbox();
            } else {
                // how did we get here?
                // console.log('for some reason the id does not exist in sprites and is not the stage');
            }
        }
    }
    handleChangeSpriteDirection (direction) {
        this.props.vm.postSpriteInfo({direction});
    }
    handleChangeSpriteName (name) {
        this.props.vm.renameSprite(this.props.editingTarget, name);
    }
    handleChangeSpriteRotationStyle (rotationStyle) {
        this.props.vm.postSpriteInfo({rotationStyle});
    }
    handleChangeSpriteVisibility (visible) {
        this.props.vm.postSpriteInfo({visible});
    }
    handleChangeSpriteX (x) {
        this.props.vm.postSpriteInfo({x});
    }
    handleChangeSpriteY (y) {
        this.props.vm.postSpriteInfo({y});
    }
    handleDeleteSprite (id) {
        this.props.vm.deleteSprite(id);
    }
    handleSelectSprite (id) {
        this.props.vm.setEditingTarget(id);
    }
    handleSpeechClick () {
        // this.props.vm.addSprite2(JSON.stringify(SpeechExtension.sprite));
        // this.props.onSetSpeechToolbox();
        // this.selectExtensionsCategory();
        this.props.vm.runtime.HACK_SpeechBlocks.startSpeechRecogntion();
    }
    handleWedoClick () {
        // this.props.vm.addSprite2(JSON.stringify(WedoExtension.sprite));
        this.props.vm.runtime.HACK_WeDo2Blocks.connect();
        // this.props.onSetWedoToolbox();
        // this.selectExtensionsCategory();
    }

    selectExtensionsCategory () {
        const categories = window.workspace.toolbox_.categoryMenu_.categories_;
        for (let i = 0; i < categories.length; i++) {
            if (categories[i].name_ === 'Extensions') {
                window.workspace.toolbox_.setSelectedItem(categories[i]);
            }
        }
    }

    render () {
        return (
            <TargetPaneComponent
                {...this.props}
                onChangeSpriteDirection={this.handleChangeSpriteDirection}
                onChangeSpriteName={this.handleChangeSpriteName}
                onChangeSpriteRotationStyle={this.handleChangeSpriteRotationStyle}
                onChangeSpriteVisibility={this.handleChangeSpriteVisibility}
                onChangeSpriteX={this.handleChangeSpriteX}
                onChangeSpriteY={this.handleChangeSpriteY}
                onDeleteSprite={this.handleDeleteSprite}
                onNewSpeechClick={this.handleSpeechClick}
                onNewWedoClick={this.handleWedoClick}
                onSelectSprite={this.handleSelectSprite}
            />
        );
    }
}

const {
    onSelectSprite, // eslint-disable-line no-unused-vars
    ...targetPaneProps
} = TargetPaneComponent.propTypes;

TargetPane.propTypes = {
    ...targetPaneProps
};

const mapStateToProps = state => ({
    editingTarget: state.targets.editingTarget,
    sprites: Object.keys(state.targets.sprites).reduce((sprites, k) => {
        let {direction, x, y, ...sprite} = state.targets.sprites[k];
        if (typeof direction !== 'undefined') direction = Math.round(direction);
        if (typeof x !== 'undefined') x = Math.round(x);
        if (typeof y !== 'undefined') y = Math.round(y);
        sprites[k] = {...sprite, direction, x, y};
        return sprites;
    }, {}),
    stage: state.targets.stage,
    soundLibraryVisible: state.modals.soundLibrary,
    spriteLibraryVisible: state.modals.spriteLibrary,
    costumeLibraryVisible: state.modals.costumeLibrary,
    backdropLibraryVisible: state.modals.backdropLibrary
});

const mapDispatchToProps = dispatch => ({
    onNewBackdropClick: e => {
        e.preventDefault();
        dispatch(openBackdropLibrary());
    },
    onNewSpriteClick: e => {
        e.preventDefault();
        dispatch(openSpriteLibrary());
    },
    onRequestCloseBackdropLibrary: () => {
        dispatch(closeBackdropLibrary());
    },
    onRequestCloseCostumeLibrary: () => {
        dispatch(closeCostumeLibrary());
    },
    onRequestCloseSoundLibrary: () => {
        dispatch(closeSoundLibrary());
    },
    onRequestCloseSpriteLibrary: () => {
        dispatch(closeSpriteLibrary());
    },
    onSetSpriteToolbox: () => {
        dispatch(setSpriteToolbox());
    },
    onSetStageToolbox: () => {
        dispatch(setStageToolbox());
    },
    onSetSpeechToolbox: () => {
        dispatch(setSpeechToolbox());
    },
    onSetWedoToolbox: () => {
        dispatch(setWedoToolbox());
    }

});

module.exports = connect(
    mapStateToProps,
    mapDispatchToProps
)(TargetPane);
