from pathlib import Path


class con_settings():
    def __init__(self):
        # self.config_path = '../../../../config.json'
        self.config_path = (f'{Path( __file__ ).parent.parent.parent.parent.parent.absolute()}'+'/config.json').replace('\\', '/')